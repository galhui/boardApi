import { IsOptional } from "class-validator";
import { BooleanBitValueTransformer } from "core/tranform/boolean.transform";
import { TransformBoolean } from "core/tranform/common.trasform";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from '../../comment/entities/comment.entity'

@Entity("Board", { schema: "board" })
export class Board {
  @PrimaryGeneratedColumn({ type: "int", name: "idx" })
  @IsOptional()
  idx: number;

  @Column("varchar", { name: "userName", length: 50 })
  userName: string;

  @Column("varchar", { name: "password", length: 200 })
  password: string;

  @Column("varchar", { name: "title", length: 100 })
  title: string;

  @Column("text", { name: "contents" })
  contents: string;

  @Column("timestamp", { name: "regDate", default: () => "CURRENT_TIMESTAMP" })
  regDate: Date;

  @Column("timestamp", { name: "updDate", nullable: true })
  updDate: Date | null;

  @Column("json", { name: "keyword", nullable: true })
  keyword: object | null;

  @Column("tinyint", { name: "isDel", default: () => "'0'", transformer: BooleanBitValueTransformer })
  isDel: number;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];
}
