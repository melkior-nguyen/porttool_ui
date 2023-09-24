const Global: any = {
  Loading: {
    set: (objectInput: any) => {
      Global.Loading.loading = objectInput;
    },
    get: () => Global.Loading.loading,
    modal: null,
  },
  UseNavigate: {
    set: (navigate: any) => (Global.UseNavigate.navigate = navigate),
    navigate: null,
    get: () => Global.UseNavigate.navigate,
  },
};

export default Global;
