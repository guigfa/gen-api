import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lesson } from "./lesson";
import { LessonServiceImpl } from "./services/lessonImpl.service";
import { LessonsController } from "./controller/lessons.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Lesson])],
    providers: [LessonServiceImpl],
    controllers: [LessonsController]
})
export class LessonModule {}