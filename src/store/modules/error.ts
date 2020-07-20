/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { ServerError } from '@/prototypes/error';
import { delay } from '@/utils/timer';

export interface ErrorState {
  msg: string;
  error?: ServerError;
  isFatal: boolean;
}

@Module({ dynamic: true, store, name: 'user' })
class ErrorModule extends VuexModule implements ErrorState {
  public msg = ''

  public error: ServerError | undefined;

  public isFatal = false;

  @Mutation
  private SET_MSG(msg: string) {
    this.msg = msg;
  }

  @Mutation
  private SET_SERVER_ERR(err: ServerError) {
    this.error = err;
  }

  @Mutation
  private SET_FATAL(isFatal: boolean) {
    this.isFatal = isFatal;
  }

  @Mutation
  private RESET() {
    this.msg = '';
    this.error = undefined;
    this.isFatal = false;
  }

  @Action
  public async autoDismissError(args: { msg: string; error?: ServerError; isFatal: boolean }) {
    this.SET_MSG(args.msg);
    if (args.error) {
      this.SET_SERVER_ERR(args.error);
    }
    this.SET_FATAL(args.isFatal);

    await delay(5000);
    this.RESET();
  }
}

export default getModule(ErrorModule);
