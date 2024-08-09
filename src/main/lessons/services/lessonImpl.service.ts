import { Injectable, NotFoundException } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { from, Observable, of, switchMap } from "rxjs";
import { Lesson } from "../lesson";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Course } from "src/main/courses/entity/course";

@Injectable()
export class LessonServiceImpl implements LessonService {
    constructor(
        @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
        @InjectRepository(Course) private courseRepository: Repository<Course>
    ) {}

    findAll(query: any): Observable<any> {
        return from(this.lessonRepository.find());
    }

    findOne(id: string): Observable<any> {
        return from(this.lessonRepository.findOne({ where: { id } }));
    }

    create(createLessonDto: any, courseId: string): Observable<any> {
        return from(this.courseRepository.findOne({ where: { id: courseId } })).pipe(
            switchMap((course) => {
                if (!course) {
                    throw new NotFoundException(`Course with id ${courseId} not found`);
                }
                const lesson = this.lessonRepository.create({
                    ...createLessonDto,
                    course: course
                });
                return from(this.lessonRepository.save(lesson));
            })
        );
    }

    update(id: string, updateLessonDto: any): Observable<any> {
        return from(this.lessonRepository.update(id, updateLessonDto));
    }

    remove(id: string): Observable<any> {
        return from(this.lessonRepository.delete(id));
    }
}