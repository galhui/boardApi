import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Notice", { schema: "board" })
export class Notice {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  idx: number;

  @Column("varchar", { name: "userName", length: 50 })
  userName: string;

  @Column("text", { name: "contents" })
  contents: string;

  @Column("varchar", { name: "targetUrl", nullable: true, length: 255 })
  targetUrl: string | null;

  @Column("timestamp", { name: "regDate", default: () => "CURRENT_TIMESTAMP" })
  regDate: Date;

  @Column("timestamp", { name: "readDate", nullable: true })
  readDate: Date | null;
}
