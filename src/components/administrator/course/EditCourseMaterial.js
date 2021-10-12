import React, { useState, useContext, useEffect } from 'react';
import {
  Paper,
} from '@mui/material';
import { AdminCourseMaterialContext } from '../../../context/adminCourseMaterial.context';
import EditCourseMaterialSingleList from './EditCourseMaterialSingleList';
import AddCourseMaterial from './AddCourseMaterial';
import { ToastContext } from '../../../context/toast.context';
import { LoadingDNA3X } from '../../common/Loading';

const EditCourseMaterial = ({ course }) => {
  const [materialList, setMaterialList] = useState([]);
  const [fetched, setFetched] = useState(false);

  const materialContext = useContext(AdminCourseMaterialContext);
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    const fetchMatrialList = async () => {
      setFetched(false);
      const { materialList: material } = await materialContext.getMaterialList(course.id)
      console.log(material);
      setMaterialList(material);
      setFetched(true);
    }
    fetchMatrialList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAddMaterial = async (data) => {
    const response = await materialContext.addMaterial(course.id, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Add material failed', 'error');
    } else {
      materialList.push(response);
      setMaterialList(materialList);
      toastContext.addNotification('Success', 'Add material success');
    }
  }

  const onUpdateMaterial = async (mid, data) => {
    const response = await materialContext.updateMaterial(course.id, mid, data);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Update material failed', 'error');
    } else {
      toastContext.addNotification('Success', 'Update material success');
    }
  }

  const onDeleteMaterial = async (mid) => {
    const response = await materialContext.deleteMaterial(course.id, mid);
    if (typeof response === 'string') {
      toastContext.addNotification('Failed', 'Delete material failed', 'error');
    } else {
      const index = materialList.findIndex((m) => m.id === mid);
      materialList.splice(index, 1);
      setMaterialList(materialList);
      toastContext.addNotification('Success', 'Delete material success');
    }
  }


  return (
    <Paper
      sx={{
        px: 2,
        py: 2,
        border: 2,
        borderColor: 'primary.main',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        minHeight: '23rem',
      }}
      variant='outlined'
    >
      {
        fetched
          ? (
            materialList.map((material) => (
              <EditCourseMaterialSingleList
                key={material.id}
                material={material}
                updateMaterial={onUpdateMaterial}
                deleteMaterial={onDeleteMaterial}
              />
            ))
          )
          : (
            <LoadingDNA3X />
          )
      }
      <AddCourseMaterial
        onAddMaterial={onAddMaterial}
      />
    </Paper>
  );
}

export default EditCourseMaterial;
