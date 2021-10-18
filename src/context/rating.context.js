/* eslint-disable react/no-unused-state */
import React from 'react';
import RatingService from '../services/rating.service';

export const RatingContext = React.createContext();

class RatingProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getRatingList: this.getRatingList,
      addRating: this.addRating,
      updateRating: this.updateRating,
      deleteRating: this.deleteRating,
    };
  }
  
  getRatingList = async (uid, setting = { page: 1, limit: 20}) => {
    const response = await RatingService.getRatingList(uid, setting);
    return response;
  }

  addRating = async (uid, data) => {
    const rating = await RatingService.addRating(uid, data);
    return rating;
  }

  updateRating = async (uid, rid, data) => {
    const rating = await RatingService.updateRating(uid, rid, data);
    return rating;
  }

  deleteRating = async (uid, rid) => {
    const result = await RatingService.deleteRating(uid, rid);
    return result;
  }

  render() {
    const { children } = this.props;
    return (
      <RatingContext.Provider value={this.state}>
        { children }
      </RatingContext.Provider>
    );
  }
}

export default RatingProvider;
