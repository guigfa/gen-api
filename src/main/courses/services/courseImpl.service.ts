import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { CourseService } from "./course.service";
import { from, Observable, of, switchMap, catchError } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../entity/course.entity";
import { Repository } from "typeorm";
import { AjaxResponse } from "src/shared/models/response.model";

@Injectable()
export class CourseServiceImpl implements CourseService {

    constructor(
        @InjectRepository(Course) private repository: Repository<Course>,
    ) { }

    findAll(query: Partial<Course>): Observable<AjaxResponse> {
        return from(
            this.repository.find({
                where: {
                    ...query,
                },
                relations: ['lessons'],
                loadEagerRelations: true
            })
        ).pipe(
            switchMap((courses) => {
                return of({
                    message: 'Courses retrieved successfully',
                    data: courses,
                    status: 200,
                });
            }),
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while retrieving courses.');
            })
        );
    }

    findOne(id: string): Observable<AjaxResponse> {
        return from(this.repository.findOne({
            where: { id },
            relations: ['lessons'],
            loadEagerRelations: true
        })).pipe(
            switchMap((course) => {
                if (!course) {
                    throw new NotFoundException(`Course with id ${id} not found`);
                }
                return of({ message: 'Course retrieved successfully', data: { ...course }, status: 200 });
            }),
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while retrieving the course.');
            })
        );
    }

    create(createCourseDto: any): Observable<AjaxResponse> {
        const course = this.repository.create(createCourseDto);
        return from(this.repository.save(course)).pipe(
            switchMap(() =>
                of({ message: 'Course created successfully', data: course, status: 201 })
            ),
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while creating the course.');
            })
        );
    }

    update(id: string, updateCourseDto: any): Observable<AjaxResponse> {
        return from(this.repository.update(id, updateCourseDto)).pipe(
            switchMap(() =>
                of({
                    message: 'Course updated successfully', data: updateCourseDto.map(course => {
                        delete course.id;
                        return course;
                    }), status: 200
                })
            ),
            catchError((error) => {
                throw new InternalServerErrorException('An error occurred while updating the course.');
            })
        );
    }

    delete(id: string): Observable<AjaxResponse> {
        return from(this.repository.findOne({ where: { id } })).pipe(
            switchMap((course) => {
                if (!course) {
                    throw new NotFoundException(`Course with id ${id} not found`);
                }
                course.active = false;
                return from(this.repository.save(course)).pipe(
                    switchMap(() =>
                        of({ message: 'Course deactivated successfully', data: null, status: 204 })
                    ),
                    catchError((error) => {
                        throw new InternalServerErrorException('An error occurred while deactivating the course.');
                    })
                );
            }),
            catchError((error) => {
                throw error;
            })
        );
    }

}
