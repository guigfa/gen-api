import { Observable } from "rxjs";
import { AjaxResponse } from "src/shared/models/response.model";
import { Course } from "../entity/course.entity";

export interface CourseService {
    findAll(query: Course): Observable<AjaxResponse>;
    findOne(id: string): Observable<AjaxResponse>;
    create(createCourseDto: Course): Observable<AjaxResponse>;
    update(id: string, updateCourseDto: Partial<Course>): Observable<AjaxResponse>;
    delete(id: string): Observable<AjaxResponse>;
}