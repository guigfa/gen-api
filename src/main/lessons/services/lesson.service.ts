import { Observable } from "rxjs";

export interface LessonService {
    findAll(query: any): Observable<any>;
    findOne(id: string): Observable<any>;
    create(createLessonDto: any, couseId: string): Observable<any>;
    update(id: string, updateLessonDto: any): Observable<any>;
    remove(id: string): Observable<any>;
}