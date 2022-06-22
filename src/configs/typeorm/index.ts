import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { getMetadataArgsStorage } from "typeorm";

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            type: 'mongodb',
            url: 'mongodb://localhost:271017',
            entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
            synchronize: true,
            autoLoadEntities: true,
            useUnifiedTopology:true,
            useNewUrlParser:true
        };
    }
}