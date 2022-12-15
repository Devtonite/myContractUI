import {
  Field,
  SmartContract,
  state,
  State,
  method,
  DeployArgs,
  Permissions,
} from 'snarkyjs';

export class simpleVal extends SmartContract {
  @state(Field) simpleVal = State<Field>();

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
    this.simpleVal.set(Field(50));
  }

  @method increment() {
    const currentState = this.simpleVal.get();
    this.simpleVal.assertEquals(currentState);
    const newState = currentState.add(5);
    newState.assertEquals(currentState.add(5));
    this.simpleVal.set(newState);
  }

  @method decrement() {
    const currentState = this.simpleVal.get();
    this.simpleVal.assertEquals(currentState);
    const newState = currentState.sub(5);
    newState.assertEquals(currentState.sub(5));
    this.simpleVal.set(newState);
  }
}
