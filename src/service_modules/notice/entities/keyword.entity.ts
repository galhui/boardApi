import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Keyword", { schema: "board" })
export class Keyword {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "userName", length: 50 })
  userName: string;

  @Column("varchar", { name: "keyword", length: 100 })
  keyword: string;
}
