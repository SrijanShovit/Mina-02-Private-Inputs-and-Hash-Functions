import {Field,
    SmartContract,
    state,
    State,
    method,
    Poseidon
} from 'snarkyjs';

export class IncrementSecret extends SmartContract{
    @state(Field) x = State<Field>();

    @method initState(salt:Field,firstsecret:Field){
        this.x.set(Poseidon.hash([salt,firstsecret]));
    }

    @method incrementSecret(salt:Field,secret:Field){
        const x = this.x.get();
        this.x.assertEquals(x);

        Poseidon.hash([salt,secret]).assertEquals(x);
        this.x.set(Poseidon.hash([salt,secret.add(1)]));
    }
}