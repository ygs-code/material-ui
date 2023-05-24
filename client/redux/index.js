import { CheckDataType } from "client/utils";
import { connect } from "react-redux";

const mapRedux = (modelsName) => (Component) => {
  const mapStateToProps = (state) => {
    let newState = {};
    if (CheckDataType.isUndefined(modelsName)) {
      newState = state;
    } else if (CheckDataType.isArray(modelsName)) {
      for (const key of modelsName) {
        if (state[key]) {
          newState[key] = state[key];
        }
      }
    } else if (CheckDataType.isString(modelsName)) {
      if (state[modelsName]) {
        newState[modelsName] = state[modelsName];
      }
    }

    return {
      state: newState
    };
  };

  const mapDispatchToProps = (dispatch) => {
    let newDispatch = {};
    if (CheckDataType.isUndefined(modelsName)) {
      newDispatch = dispatch;
    } else if (CheckDataType.isArray(modelsName)) {
      for (const key of modelsName) {
        if (dispatch[key]) {
          newDispatch[key] = dispatch[key];
        }
      }
    } else if (CheckDataType.isString(modelsName)) {
      if (dispatch[modelsName]) {
        newDispatch[modelsName] = dispatch[modelsName];
      }
    }

    return {
      dispatch: newDispatch
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

const getPropsState = (global, modelKey, dataKey = "initState") => {
  let initState;
  if (
    global &&
    global.__INITIAL_STATE__ &&
    global.__INITIAL_STATE__[modelKey] &&
    global.__INITIAL_STATE__[modelKey][dataKey]
  ) {
    initState = global.__INITIAL_STATE__[modelKey][dataKey];
  }

  return initState;
};

export { getPropsState, mapRedux };
