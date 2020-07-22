/* eslint-disable import/no-cycle */
import {
  VuexModule, Module, getModule, Action, Mutation,
} from 'vuex-module-decorators';
import store from '@/store';
import { Error, ServerError } from '@/prototypes/error';
import { delay } from '@/utils/timer';

export interface ErrorState {
  error?: Error | ServerError;
  isFatal: boolean;
}

@Module({ dynamic: true, store, name: 'user' })
class ErrorModule extends VuexModule implements ErrorState {
  public error: Error | ServerError | undefined;

  public isFatal = false;

  @Mutation
  private SET_ERR(err: Error | ServerError) {
    this.error = err;
  }

  @Mutation
  private SET_FATAL(isFatal: boolean) {
    this.isFatal = isFatal;
  }

  @Mutation
  private RESET() {
    this.error = undefined;
    this.isFatal = false;
  }

  @Action
  public async autoDismissError(error: Error | ServerError) {
    this.SET_ERR(error);
    if ('statusCode' in error && error.statusCode === 500) {
      this.SET_FATAL(true);
    }

    await delay(5000);
    this.RESET();
  }
}

export default getModule(ErrorModule);
