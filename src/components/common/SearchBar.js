import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import URLService from '../../services/URL.service';

const SearchBar = (props) => {
  const searchInput = React.createRef();
  let trigger;

  const toggleQueryHandler = () => {
    if (props.toggleQuery) {
      const query = URLService.getAllQueryString();
      searchInput.current.value = query[props.searchKey] || '';
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(toggleQueryHandler, []);

  const onKeyUp = () => {
    clearTimeout(trigger);
    if (props.toggleQuery) {
      trigger = setTimeout(() => {
        try {
          URLService.setQueryString(props.searchKey, searchInput.current.value);
        } catch (error) {
          // console.log(error);
        }
      }, 500);
    } else {
      props.onChange({
        target: {
          value: searchInput.current.value,
        },
      });
    }
  };

  const { Id, placeholder } = props;

  return (
    <div className="d-flex border rounded">
      <div className="px-2 bg-white rounded d-flex align-items-center">
        <span className="fas fa-search fa-fw d-inline-block" />
      </div>
      <FormControl
        id={Id}
        className="border-0 rounded pl-0"
        aria-label="Search"
        placeholder={placeholder}
        onKeyUp={onKeyUp}
        maxLength="15"
        ref={searchInput}
      />
    </div>
  );
};

SearchBar.propTypes = {
  Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  toggleQuery: PropTypes.bool,
  searchKey: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
SearchBar.defaultProps = {
  Id: 'search-pattern',
  onChange: undefined,
  searchKey: 'search',
  placeholder: 'Search',
  toggleQuery: false,
};

export default SearchBar;
