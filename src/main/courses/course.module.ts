import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./entity/course.entity";
import { CourseServiceImpl } from "./services/courseImpl.service";
import { CourseController } from "./controller/courses.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    providers: [CourseServiceImpl],
    controllers: [CourseController]
})
export class CourseModule {}