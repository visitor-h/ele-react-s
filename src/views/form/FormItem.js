/* @flow */

import React from 'react';
import AsyncValidator from 'async-validator';
import { Component, PropTypes, Transition } from '../../libs';

export default class FormItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: '',
      valid: false,
      validating: false
    }
  }

  getChildContext() {
    return {
      form: this
    };
  }

  componentDidMount() {
    const { prop } = this.props;

    if (prop) {
      this.parent().addField(this);

      this.initialValue = this.getInitialValue();
    }
  }

  componentWillUnmount() {
    this.parent().removeField(this);
  }

  parent() {
    return this.context.component;
  }

  isRequired() {
    let rules = this.getRules();
    let isRequired = false;

    if (rules && rules.length) {
      rules.every(rule => {
        if (rule.required) {
          isRequired = true;

          return false;
        }
        return true;
      });
    }

    return isRequired;
  }

  onFieldBlur() {
    this.validate('blur');
  }

  onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;

      return;
    }
    
    setTimeout(() => {
      this.validate('change');
      
    });
  }

  validate(trigger, cb){
    const rules = this.getFilteredRule(trigger);

    if (!rules || rules.length === 0) {
      if (cb instanceof Function) {
        cb();
      }

      return true;
    }

    this.setState({ validating: true });

    const descriptor = { [this.props.prop]: rules };
    const validator = new AsyncValidator(descriptor);
    const model = { [this.props.prop]: this.fieldValue() };

    validator.validate(model, { firstFields: true }, errors => {
      this.setState({
        error: errors ? errors[0].message : '',
        validating: false,
        valid: !errors
      }, () => {
        if (cb instanceof Function) {
          cb(errors);
        }
      });
    });
  }

  getInitialValue() {
    const value = this.parent().props.model[this.props.prop];

    if (value === undefined) {
      return value;
    } else {
      return JSON.parse(JSON.stringify(value));
    }
  }

  resetField() {
    let { valid, error } = this.state;

    valid = true;
    error = '';

    this.setState({ valid, error });

    let value = this.fieldValue();

    if (Array.isArray(value) && value.length > 0) {
      this.validateDisabled = true;
      this.parent().props.model[this.props.prop] = [];
    } else if (value) {
      this.validateDisabled = true;
      this.parent().props.model[this.props.prop] = this.initialValue;
    }
  }

  getRules() {
    let formRules = this.parent().props.rules;
    let selfRuels = this.props.rules;

    formRules = formRules ? formRules[this.props.prop] : [];
    return [].concat(selfRuels || formRules || []);
  }

  getFilteredRule(trigger) {
    const rules = this.getRules();

    return rules.filter(rule => {
      if (!rule.trigger || trigger === '') return true;
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(rule => Object.assign({}, rule));
  }

  labelStyle() {
    const ret = {};

    if (this.parent().props.labelPosition === 'top') return ret;

    const labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

    if (labelWidth) {
      ret.width = parseInt(labelWidth);
    }

    return ret;
  }

  contentStyle() {
    const ret = {};

    if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

    const labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

    if (labelWidth) {
      ret.marginLeft = parseInt(labelWidth);
    }

    return ret;
  }

  fieldValue() {
    const model = this.parent().props.model;
    if (!model || !this.props.prop) { return; }
    const temp = this.props.prop.split(':');
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
  }

  render() {
    const { error, validating } = this.state;
    const { label, required } = this.props;

    return (
      <div style={this.style()} className={this.className('el-form-item', {
        'is-error': error !== '',
        'is-validating': validating,
        'is-required': this.isRequired() || required
      })} onBlur={this.onFieldBlur.bind(this)} onChange={this.onFieldChange.bind(this)}>
        {
          label && (
            <label className="el-form-item__label" style={this.labelStyle()}>
              {
                typeof(label) === 'string'? 
                label + this.parent().props.labelSuffix :
                label
              }
            </label>
          )
        }
        <div className="el-form-item__content" style={this.contentStyle()}>
          {this.props.children}
          <Transition name="el-zoom-in-top">
            { error && <div className="el-form-item__error">{error}</div> }
          </Transition>
        </div>
      </div>
    )
  }
}

FormItem.contextTypes = {
  component: PropTypes.any
};

FormItem.childContextTypes = {
  form: PropTypes.any
};

FormItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
