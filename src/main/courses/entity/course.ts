import { Lesson } from "src/main/lessons/lesson";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("courses")
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "description" })
    description: string;

    @Column({ name: "active" })
    active: boolean;

    @OneToMany(() => Lesson, (lesson) => lesson.course, { cascade: true })
    lessons: Lesson[];
}