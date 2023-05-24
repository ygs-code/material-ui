/*
 * @Author: your name
 * @Date: 2021-08-23 19:51:05
 * @LastEditTime: 2021-08-26 18:17:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/component/Form/index.js
 */
import "./index.less";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Switch,
  TextField
} from "@mui/material";
import FormItem from "client/component/FormItem";
import { CheckDataType } from "client/utils";
import { createForm } from "rc-form";
import React, {
  Children,
  cloneElement,
  createElement,
  useCallback,
  useEffect,
  useState
} from "react";

// const { Password, TextArea } = Input;
const FromRadio = (props) => {
  const { error, label, options = [], value, onChange, formProps = {} } = props;

  const { required } = formProps;

  return (
    <FormControl
      onChange={({ target }) => {
        onChange(target.value);
      }}
      error={error}>
      <FormLabel error={error}>{required ? label + " *" : label}</FormLabel>
      <RadioGroup error={error} row>
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <FormControlLabel
              key={$value}
              value={$value}
              control={<Radio checked={$value === value} />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const FromSelect = (props) => {
  const {
    error,
    label,
    options = [],
    value,
    onChange,
    formProps = {},
    name
  } = props;

  const { required } = formProps;

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250
  //     }
  //   }
  // };

  return (
    <FormControl value={value} fullWidth size="small" error={error}>
      <InputLabel
        value={value}
        error={error}
        id={`${name}-simple-select-label`}>
        {required ? label + " *" : label}
      </InputLabel>
      <Select
        onChange={({ target }) => {
          onChange(target.value);
        }}
        error={error}
        labelId={`${name}-simple-select-label`}
        id={`${name}-simple-select`}
        label={required ? label + " *" : label}
        value={value}
        defaultValue={value}
        // displayEmpty
        name={name}
        // inputProps={{ "aria-label": "Without label" }}
        // inputProps={{
        //   name: name,
        //   id: `${name}-simple-select-label`
        // }}
        {...formProps}>
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <MenuItem key={$value} value={$value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const FromMultipleSelect = (props) => {
  const {
    error,
    label,
    options = [],
    value = [],
    onChange,
    formProps = {}
  } = props;

  const { required } = formProps;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel error={error}>{required ? label + " *" : label}</InputLabel>
      <Select
        onChange={({ target }) => {
          onChange(target.value);
        }}
        error={error}
        label={required ? label + " *" : label}
        value={value}
        {...formProps}
        multiple
        // input={<OutlinedInput label="Tag" />}
        // renderValue={(selected) => selected.join(", ")}

        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}>
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <MenuItem key={$value} value={$value}>
              {/*label*/}
              <Checkbox checked={value.indexOf($value) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const FromSwitch = (props) => {
  const { error, label, options = [], value, onChange, formProps = {} } = props;

  const { required } = formProps;

  return (
    <FormControl error={error} onChange={() => {}}>
      <FormLabel onChange={() => {}}>
        {required ? label + " *" : label}
      </FormLabel>
      <FormGroup onChange={() => {}}>
        {options.map((item, index) => {
          const { label, value: $value } = item;
          return (
            <FormControlLabel
              key={index}
              value={$value}
              label={label}
              onChange={({ target }) => {
                onChange(target.checked);
              }}
              control={<Switch checked={value} />}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

const FromCheckbox = (props) => {
  const {
    error,
    label,
    options = [],
    value = [],
    onChange,
    formProps = {}
  } = props;
  const { required } = formProps;

  return (
    <FormControl
      onChange={({ target }) => {
        const { value: $value, checked } = target;
        if (checked) {
          value.push($value);
        } else {
          let index = value.findIndex((item) => {
            return item === $value;
          });
          if (index >= 0) {
            value.splice(index, 1);
          }
        }
        onChange([...value]);
      }}
      error={error}>
      <FormLabel>{required ? label + " *" : label}</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label">
        {options.map((item) => {
          const { label, value: $value } = item;
          return (
            <FormControlLabel
              key={$value}
              value={$value}
              label={label}
              control={
                <Checkbox
                  checked={value.includes($value)}
                  onChange={() => {}}
                  name={$value}
                />
              }
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const FromTextField = (props) => {
  const { error, label, value = "", onChange, formProps = {} } = props;
  const { readOnly, disabled } = formProps;
  return (
    <TextField
      error={error}
      disabled={readOnly || disabled}
      className="full-width"
      variant="outlined"
      size="small"
      label={label}
      {...formProps}
      value={value}
      onChange={({ target }) => {
        onChange(target.value);
      }}
    />
  );
};

const FromRender = (props) => {
  const {
    error,
    label,
    // options = [],
    value,
    // onChange,
    formProps = {},
    children,
    initialValue
  } = props;
  const { required } = formProps;

  return (
    <FormControl error={error}>
      <FormLabel>{required ? label + " *" : label}</FormLabel>
      {createElement(children, {
        ...props,
        render: undefined,
        value: value === undefined ? initialValue : value
      })}
    </FormControl>
  );
};

const FromComponent = (props) => {
  const {
    error,
    label,
    // options = [],
    value,
    // onChange,
    formProps = {},
    children,
    initialValue
  } = props;
  const { required } = formProps;

  return (
    <FormControl error={error}>
      <FormLabel>{required ? label + " *" : label}</FormLabel>
      {cloneElement(children, {
        ...props,
        render: undefined,
        value: value === undefined ? initialValue : value
      })}
    </FormControl>
  );
};

const itemChild = (props) => {
  let {
    type = "",
    props: formProps = {},
    component,
    render
    // value,
    // initialValue
  } = props;

  type = type ? type.toLowerCase() : type;

  const { multiple } = formProps;

  const mapTpye = {
    textarea: (
      <FromTextField
        {...props}
        formProps={{
          multiline: true,
          rows: 4,
          ...formProps
        }}
      />
    ),
    input: <FromTextField {...props} />,
    radio: <FromRadio {...props} />,
    // rate: (
    //   <Rate
    //     {...formProps}
    //     disabled={readOnly || disabled}
    //     value={value}
    //     onChange={onChange}></Rate>
    // ),
    select: multiple ? (
      <FromMultipleSelect
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}

        {...props}
      />
    ) : (
      <FromSelect
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}
        {...props}
      />
    ),

    switch: (
      <FromSwitch
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}
        {...props}
      />
    ),
    slider: (
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
        {...formProps}
        // {...props}
      />
    ),
    // timepicker: (
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <TimePicker
    //       label={label}
    //       // value={value}
    //       // onChange={(newValue) => {
    //       //   setValue(newValue);
    //       // }}
    //       renderInput={(params) => <TextField {...params} />}
    //     />
    //   </LocalizationProvider>
    // ),
    // transfer: (
    //   <Transfer
    //     {...formProps}
    //     disabled={readOnly || disabled}
    //     value={value}
    //     onChange={onChange}></Transfer>
    // ),
    checkbox: (
      <FromCheckbox
        // fullWidth
        // size="small"
        // error={error}
        // label={label}
        // options={options}
        // {...formProps}
        {...props}
      />
    )
  };

  return render ? (
    <FromRender {...props}>{render}</FromRender>
  ) : // render({
  //     ...props,
  //     render: undefined,
  //     value: value === undefined ? initialValue : value
  //   })
  component ? (
    <FromComponent {...props}>{component}</FromComponent>
  ) : type in mapTpye ? (
    mapTpye[type]
  ) : null;
};

const BaseForm = createForm()((props) => {
  const {
    fields = [],
    // formProps = {},
    onReady = () => {},
    children = [],
    // onConfirm = () => {},
    // onReset = () => {},
    initialValues = {},
    form
  } = props;
  const [initialValuesFlag, setInitialValuesFlag] = useState(false);
  const [values, setInitialValues] = useState({});
  // const { setFieldsValue } = form;

  const transformInitialValues = useCallback(async (initialValues) => {
    if (CheckDataType.isFunction(initialValues)) {
      return initialValues(form);
    }
    if (CheckDataType.isPromise(initialValues)) {
      return await initialValues(form);
    }

    return initialValues;
  }, []);
  const getInitialValues = useCallback(async () => {
    const values = await transformInitialValues(initialValues);
    setInitialValues(values);
    setInitialValuesFlag(true);
    // setFieldsValue(vavlues);
  }, []);

  useEffect(() => {
    getInitialValues();
  }, []);

  const getValue = useCallback(
    (name) => {
      return values[name];
    },
    [values]
  );

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  //   onConfirm(values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  useEffect(() => {
    onReady(form);
  }, [form]);

  return (
    <div className="base-form">
      {initialValuesFlag ? (
        <Box sx={{ width: "500px" }}>
          {fields.map((item, index) => {
            const {
              type,
              title,
              items = [],
              render,
              // itemProps = {},
              label,
              name,
              props = {},
              options = [],
              rules,
              extra,
              component
            } = item;
            const { initialValue = getValue(name) } = item;

            return type !== "section" ? (
              <div className="item" key={index}>
                <FormItem
                  initialValue={initialValue}
                  extra={extra}
                  rules={rules}
                  form={form}
                  label={label}
                  name={name}>
                  {itemChild({
                    type,
                    props,
                    options,
                    label,
                    name,
                    render,
                    initialValue,
                    component
                  })}
                </FormItem>
              </div>
            ) : (
              <div className="section" key={index}>
                <div className="title">{title}</div>
                {items.map(($item, $index) => {
                  const {
                    render,
                    // itemProps = {},
                    label,
                    name,
                    options = [],
                    props = {},
                    type,
                    rules,
                    extra,
                    component
                    // initialValue = getValue(name)
                  } = $item;
                  const { initialValue = getValue(name) } = $item;
                  return (
                    <div key={`${index}_${$index}`} className="item">
                      <FormItem
                        initialValue={initialValue}
                        extra={extra}
                        rules={rules}
                        form={form}
                        label={label}
                        name={name}>
                        {itemChild({
                          type,
                          props,
                          options,
                          label,
                          name,
                          render,
                          initialValue,
                          component
                        })}
                      </FormItem>
                    </div>

                    // <Form.Item
                    //   label={label}
                    //   name={name}
                    //   rules={rules}
                    //   {...itemProps}
                    //   key={index}>
                    //   <itemChild
                    //     type={type}
                    //     props={props}
                    //     options={options}
                    //     render={render}></itemChild>
                    // </Form.Item>
                  );
                })}
              </div>
            );
          })}
          {/* 子节点 */}
          {Children.map(
            CheckDataType.isFunction(children) ? children() : children,
            (child) => {
              return cloneElement(child, props);
            }
          )}
        </Box>
      ) : (
        <>
          {fields.reduce((acc, item, index) => {
            const { type, items = [] } = item;
            if (type === "section") {
              for (let [$index] of items.entries()) {
                acc.push(
                  <Skeleton
                    className="item"
                    height={40}
                    key={`${index}_${$index}`}
                  />
                );
              }
            } else {
              acc.push(<Skeleton className="item" height={35} key={index} />);
            }
            return acc;
          }, [])}
        </>
      )}
    </div>
  );
});

const SearchForm = createForm()((props) => {
  const {
    fields = [],
    // formProps = {},
    onReady = () => {},
    children = [],
    shrinkLength,
    onConfirm = () => {},
    onReset = () => {},
    // initialValues = {},
    form
  } = props;

  const { validateFields } = form;

  const onSubmit = async () => {
    validateFields((error, values) => {
      if (!error) {
        onFinish(values);
      } else {
        console.error(error);
      }
    });
  };

  // const [formInitialValues, setFormInitialValues] = useState({});

  // const transformInitialValues = useCallback(async (initialValues) => {
  //   if (CheckDataType.isFunction(initialValues)) {
  //     return initialValues(form);
  //   }
  //   if (CheckDataType.isPromise(initialValues)) {
  //     return await initialValues(form);
  //   }

  //   return initialValues;
  // }, []);
  // const getInitialValues = useCallback(async () => {
  //   // const values = await transformInitialValues(initialValues);
  //   // setFormInitialValues(values);
  // }, []);

  // useEffect(() => {
  //   getInitialValues();
  // }, []);

  const [expand, setExpand] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    onConfirm(values);
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const onFill = () => {
    form.resetFields();
    const values = form.getFieldsValue();

    const restValues = Object.keys(values).reduce((acc, item) => {
      return {
        ...acc,
        [item]: undefined
      };
    }, {});

    // form.setFieldsValue(restValues);
    onReset(restValues);
  };

  useEffect(() => {
    onReady(form);
  }, []);

  const renderFields = useCallback(() => {
    let length = shrinkLength
      ? expand
        ? fields.length
        : shrinkLength > fields.length
        ? fields.length
        : shrinkLength
      : fields.length;
    let fieldsVonde = [];
    for (let index = 0; index < length; index++) {
      const item = fields[index];

      const {
        span = 1,
        label,
        name,
        // itemProps = {},
        type,
        props,
        rules = [],
        options = [],
        extra,
        render,
        initialValue
      } = item;

      fieldsVonde.push(
        <div key={index} className={`span margin-top-10  span-${span}`}>
          <FormItem
            initialValue={initialValue}
            extra={extra}
            rules={rules}
            form={form}
            label={label}
            name={name}>
            {itemChild({
              type,
              props,
              options,
              label,
              name,
              render
            })}
          </FormItem>
        </div>
      );
    }
    return fieldsVonde;
  }, [expand, fields, form]);

  return (
    <div className="search-base-form-box">
      {renderFields(props)}

      <div className={`buttons margin-top-10`}>
        {shrinkLength >= fields.length ? null : (
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}>
            {expand ? (
              <>
                <KeyboardArrowUpIcon />
                收起
              </>
            ) : (
              <>
                <KeyboardArrowDownIcon /> 展开
              </>
            )}
          </a>
        )}
        <Button
          variant="contained"
          onClick={() => {
            onSubmit();
          }}>
          搜索
        </Button>
        <Button variant="outlined" onClick={onFill}>
          重置
        </Button>
      </div>

      {/* 子节点 */}
      {Children.map(
        CheckDataType.isFunction(children) ? children() : children,
        (child) => {
          return cloneElement(child, props);
        }
      )}
    </div>
  );
});
// BaseForm.SearchForm=SearchForm
export default BaseForm;
export { SearchForm };
