import { Observable } from "rxjs";

export interface CourseService {
    findAll(query: any): Observable<any>;
    findOne(id: string): Observable<any>;
    create(createCourseDto: any): Observable<any>;
    update(id: string, updateCourseDto: any): Observable<any>;
    remove(id: string): Observable<any>;
}