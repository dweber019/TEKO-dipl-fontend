import { NativeStorage } from '@ionic-native/native-storage';

export class NativeStorageMock extends NativeStorage {

  public setItem(reference: string, value: any): Promise<any> {
    return new Promise(resolve => {
      localStorage.setItem(reference, value);
      resolve(value);
    });
  }

  public getItem(reference: string): Promise<any> {
    return new Promise(resolve => {
      resolve(localStorage.getItem(reference));
    });
  }

  public remove(reference: string): Promise<any> {
    return new Promise(resolve => {
      localStorage.removeItem(reference);
      resolve(reference);
    });
  }

  public clear(): Promise<any> {
    return new Promise(resolve => {
      localStorage.clear();
      resolve(true);
    });
  }
}
