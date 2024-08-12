import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { from, Observable, of, switchMap, catchError, map } from "rxjs";
import { Lesson } from "../lesson.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "src/main/courses/entity/course.entity";
import { AjaxResponse } from "src/shared/models/response.model";

@Injectable()
export class LessonServiceImpl implements LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
        @InjectRepository(Course) private courseRepository: Repository<Course>
    ) {}

    findAll(query: Partial<Lesson>): Observable<Lesson[]> {
        return from(this.lessonRepository.find({
            where: {
                ...query
            },
            loadRelationIds: true
        })).pipe(
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while retrieving lessons.');
            })
        );
    }

    findOne(id: string): Observable<Lesson> {
        return from(this.lessonRepository.findOne({ where: { id } })).pipe(
            switchMap((lesson) => {
                if (!lesson) {
                    throw new NotFoundException(`Lesson with id ${id} not found`);
                }
                return of(lesson);
            }),
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while retrieving the lesson.');
            })
        );
    }

    create(createLessonDto: any, courseId: string): Observable<AjaxResponse> {
        return from(this.courseRepository.findOne({ where: { id: courseId } })).pipe(
            switchMap((course) => {
                if (!course) {
                    throw new NotFoundException(`Course with id ${courseId} not found`);
                }
                const lesson = this.lessonRepository.create({
                    ...createLessonDto,
                    course: course
                });
                return from(this.lessonRepository.save(lesson)).pipe(
                    switchMap(() => 
                        of({ message: 'Lesson created successfully', data: lesson, status: 201 })
                    ),
                    catchError((error) => {
                        throw new InternalServerErrorException('An error occurred while creating the lesson.');
                    })
                );
            }),
            catchError((error) => {
                throw error;
            })
        );
    }

    update(id: string, updateLessonDto: any): Observable<AjaxResponse> {
        return from(this.lessonRepository.update(id, updateLessonDto)).pipe(
            switchMap(() => 
                of({ message: 'Lesson updated successfully', data: updateLessonDto, status: 200 })
            ),
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while updating the lesson.');
            })
        );
    }

    delete(id: string): Observable<AjaxResponse> {
        return from(this.lessonRepository.findOne({ where: { id } })).pipe(
            switchMap((lesson) => {
                if (!lesson) {
                    throw new NotFoundException(`Lesson with id ${id} not found`);
                }
    
                lesson.active = false;
                
                return from(this.lessonRepository.save(lesson)).pipe(
                    switchMap(() => 
                        of({ message: 'Lesson marked as inactive successfully', data: null, status: 200 })
                    ),
                    catchError((error) => {
                        throw new InternalServerErrorException('An error occurred while updating the lesson.');
                    })
                );
            }),
            catchError((error) => {
                throw error;
            })
        );
    }
}
