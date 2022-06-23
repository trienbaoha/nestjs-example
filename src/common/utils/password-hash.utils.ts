
import * as bcrypt from 'bcrypt';
import env from 'src/environments';

async function hash(password: string): Promise<string> {
    return bcrypt.hashSync(password, env.get('saltOrRounds'));
}

async function compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
}


export { hash, compare }