import React, {useEffect, useState} from 'react';

const asyncComponent = (importComponent) => {
  return props => {
    useEffect(() => {
      importComponent()
      .then(cmp => {
        this.setState({component: cmp.default});
      })
    }, []);

    const [component] = useState(null);
    const C = component;

    return C ? <C {...this.props} /> : null;
  }
}

export default asyncComponent;