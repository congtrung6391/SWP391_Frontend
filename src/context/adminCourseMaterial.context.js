/* eslint-disable react/no-unused-state */
import React from 'react';
import AdminCourseMaterialService from '../services/adminCourseMaterial.service';

export const AdminCourseMaterialContext = React.createContext();

class AdminCourseMaterialProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getMaterialList: this.getMaterialList,
      addMaterial: this.addMaterial,
      updateMaterial: this.updateMaterial,
      deleteMaterial: this.deleteMaterial,
    };
  }

  getMaterialList = async (cid) => {
    const materialList = await AdminCourseMaterialService.getMaterialList(cid);
    return materialList;
  }

  addMaterial = async (cid, data) => {
    const response = await AdminCourseMaterialService.addMaterial(cid, data);
    return response;
  }

  updateMaterial = async (cid, mid, data) => {
    const response = await AdminCourseMaterialService.updateMaterial(cid, mid, data);
    return response;
  }

  deleteMaterial = async (cid, mid) => {
    const response = await AdminCourseMaterialService.deleteMaterial(cid, mid);
    return response;
  }

  componentDidMount() {
  }

  render() {
    const { children } = this.props;
    return (
      <AdminCourseMaterialContext.Provider value={this.state}>
        { children }
      </AdminCourseMaterialContext.Provider>
    );
  }
}

export default AdminCourseMaterialProvider;
