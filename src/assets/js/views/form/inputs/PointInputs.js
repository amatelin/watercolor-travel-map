'use strict'

import React from 'react';
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
import Counter from '../../../utils/Counter';
const ENTER_KEY_CODE = 13;

function PointDraftInput(props) {
  var inputs = {"latitude": null,
                "longitude": null,
                "title": null};

  const onChange = (event) => props.onUpdatePointDraft({latitude: inputs.latitude.value,
                                                            longitude: inputs.longitude.value,
                                                          title: inputs.title.value});
  const onAddPoint = () => props.onAddPoint(props.pointType, {latitude: inputs.latitude.value,
                                                            longitude: inputs.longitude.value,
                                                            title: inputs.title.value});
  const onClosePointDraft = () => props.onClosePointDraft();
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onAddPoint();
  }
  };

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="latitudeInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Latitude</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.latitude = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.latitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="longitudeInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Longitude</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.longitude = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.longitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="titleInput"
          validationState={null}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.title = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.title}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button onClick={onAddPoint}>Save</Button>
        </Col>
        <Col md={2}>
          <Button onClick={onClosePointDraft}>Cancel</Button>
        </Col>
      </Col>
    </div>
  )
}

function PointInput(props) {
  const {point, pointEdited} = props;
  var inputs = {"latitude": null,
                "longitude": null,
                "title": null};

  const onSavePoint = () => props.onSavePoint(point.id);
  const onChange = (event) => props.onEditPoint(point.id, {latitude: inputs.latitude.value,
    longitude: inputs.longitude.value,
    title: inputs.title.value});
  const onStartEditPoint = () => props.onStartEditPoint(point.id);
  const onDeletePoint = () => props.onDeletePoint(point.id);
  const onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      onSavePoint();
    }
  };

  const isEdited = (point.id === pointEdited.id);
  var validationErrors = [null,null];
  if (isEdited && pointEdited.validationErrors) validationErrors = pointEdited.validationErrors;
  return (
    <div>
      <Col md={12}>
        <p>Point nbr. {props.pointIndex}</p>
      </Col>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="latitudeInput"
          validationState={validationErrors[0]}>
            {(props.pointIndex === 1) &&
            <ControlLabel>Latitude</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditPoint}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.latitude = ref}}
              onChange={onChange} value={props.point.coordinates.latitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="longitudeInput"
          validationState={validationErrors[1]}>
            {(props.pointIndex === 1)  &&
              <ControlLabel>Longitude</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditPoint}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.longitude = ref}}
              onChange={onChange} value={props.point.coordinates.longitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="titleInput"
          validationState={null}>
            {(props.pointIndex === 1)  &&
              <ControlLabel>Title</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditPoint}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.title = ref}}
              onChange={onChange} value={props.point.title}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        {(isEdited &&
          <Col md={2}>
            <Button onClick={onSavePoint}>Save</Button>
          </Col>
        )}
        <Col md={2}>
          <Button onClick={onDeletePoint}>Delete</Button>
        </Col>
      </Col>
    </div>

  )
}

function PointInputsComponent(props) {
  var _local_counter = 1;
  var points = props.points.filter(point => point.type == props.type);
  const onOpenPointDraft = () => props.onOpenPointDraft(props.type);
  var draftOn = ((props.pointDraft && props.pointDraft.pointType === props.type) ? true : false);
  const alreadyFilled = ((props.type === 'starting point' || props.type === 'end point') && points.size > 0);
  if(alreadyFilled) draftOn = false;
  var input = <PointDraftInput
              draft={props.pointDraft}
              onClosePointDraft={props.onClosePointDraft}
              onUpdatePointDraft={props.onUpdatePointDraft}
              onAddPoint={props.onAddPoint}
              pointType={props.type}
            />

  return (
    <Col md={12}>
      <Button disabled={alreadyFilled || draftOn} onClick={onOpenPointDraft}>Add {props.type}</Button>
      {draftOn ? input : null }

      {points.map(point => (
            <PointInput
            key={point.id}
            pointIndex={_local_counter++}
            point={point}
            {...props}

          />
        ))}

    </Col>
  )
}

function PointInputs(props) {
  return (
    <div>
      <Col md={12}>Points</Col>
        <PointInputsComponent type='starting point' {...props}/>
        <PointInputsComponent type='end point' {...props}/>
        <PointInputsComponent type='waymark' {...props}/>

    </div>
  )
}

export default PointInputs;
