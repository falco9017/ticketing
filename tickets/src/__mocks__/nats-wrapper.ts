//files inside folder __mocks__ will replace the files
//with the same name during testing
export const natsWrapper = {
  client: {
    //jest.fn keeps track of how many times has been called
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
