import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./lesson.entity";
import { LessonServiceImpl } from "./services/lessonImpl.service";
import { LessonsController } from "./controller/lessons.controller";
import { Course } from "../courses/entity/course.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, Course])],
    providers: [LessonServiceImpl],
    controllers: [LessonsController]
})
export class LessonModule {}