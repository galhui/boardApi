import { Board } from "service_modules/board/entities/board.entity";
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
  } from "typeorm";
  
  
  @Index("fk_comment_board_idx", ["boardIdx"], {})
  @Index("fk_comment_comment1_idx", ["parentIdx"], {})
  @Entity("Comment", { schema: "board" })
  export class Comment {
    @PrimaryGeneratedColumn({ type: "int", name: "idx" })
    idx: number;
  
    @Column("int", { name: "boardIdx" })
    boardIdx: number;
  
    @Column("int", { name: "parentIdx", nullable: true })
    parentIdx: number | null;
  
    @Column("varchar", { name: "path", length: 100 })
    path: string;
  
    @Column("int", { name: "sort" })
    sort: number;
  
    @Column("text", { name: "contents" })
    contents: string;
  
    @Column("varchar", { name: "userName", length: 50 })
    userName: string;
  
    @Column("varchar", { name: "password", length: 200 })
    password: string;
  
    @Column("timestamp", { name: "regDate", default: () => "CURRENT_TIMESTAMP" })
    regDate: Date;
  
    @Column("json", { name: "keyword", nullable: true })
    keyword: object | null;
  
    @ManyToOne(() => Board, (board) => board.comments, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "boardIdx", referencedColumnName: "idx" }])
    board: Board;
  
    @ManyToOne(() => Comment, (comment) => comment.comments, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    })
    @JoinColumn([{ name: "parentIdx", referencedColumnName: "idx" }])
    parentComment: Comment;
  
    @OneToMany(() => Comment, (comment) => comment.parentComment)
    comments: Comment[];
  }
  