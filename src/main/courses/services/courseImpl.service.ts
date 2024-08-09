import { Injectable } from "@nestjs/common";
import { CourseService } from "./course.service";
import { from, Observable, of } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../entity/course";
import { Repository } from "typeorm";

@Injectable()
export class CourseServiceImpl implements CourseService {
    
    constructor(
        @InjectRepository(Course) private repository: Repository<Course>,
    ) {}

    findAll(query: any): Observable<any> {
        return from(this.repository.find());
    }

    findOne(id: string): Observable<any> {
        return from(this.repository.findOne({ where: { id } }));
    }

    create(createCourseDto: any): Observable<any> {
        return of();
    }

    update(id: string, updateCourseDto: any): Observable<any> {
        return of();
    }

    remove(id: string): Observable<any> {
        return of();
    }

}