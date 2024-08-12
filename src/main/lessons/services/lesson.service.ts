import { Observable } from "rxjs";
import { Lesson } from "../lesson.entity";
import { AjaxResponse } from "src/shared/models/response.model";

export interface LessonService {
    findAll(query: Partial<Lesson>): Observable<Lesson[]>;
    findOne(id: string): Observable<Lesson>;
    create(createLessonDto: Lesson, couseId: string): Observable<AjaxResponse>;
    update(id: string, updateLessonDto: Partial<Lesson>): Observable<AjaxResponse>;
    delete(id: string): Observable<AjaxResponse>;
}