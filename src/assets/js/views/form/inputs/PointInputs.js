'use strict'

import React from 'react';
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
const ENTER_KEY_CODE = 13;

function PointDraftInput(props) {
  var inputs = {address: null,
                title: null};

  const onChange = (event) => props.onUpdatePointDraft({address: inputs.address.value,
                                                        title: inputs.title.value});
  const onAddPoint = () => props.onAddPoint(props.pointType, {address: inputs.address.value,
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
        <Col md={6}>
          <FormGroup controlId="addressInput"
          validationState={props.draft.validationError}>
            <ControlLabel>Address</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.address = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.longitude}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={6}>
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
  var inputs = {"address": null,
                "title": null};

  const onSavePoint = () => props.onSavePoint(point.id);
  const onChange = (event) => props.onEditPoint(point.id, {address: inputs.address.value,
                                                          title: inputs.title.value});
  const onStartEditPoint = () => props.onStartEditPoint(point.id);
  const onDeletePoint = () => props.onDeletePoint(point.id);
  const onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      onSavePoint();
    }
  };

  const isEdited = (point.id === pointEdited.id);
  var validationError = null;
  if (isEdited && pointEdited.validationError) validationError = pointEdited.validationError;
  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={6}>
          <FormGroup controlId="addressInput"
          validationState={validationError}>
            {(props.pointIndex === 1)  &&
              <ControlLabel>Address</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditPoint}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.address = ref}}
              onChange={onChange} value={props.point.address}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={6}>
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
  const alreadyFilled = ((props.type === 'startpoint' || props.type === 'endpoint') && points.size > 0);
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
      <Col md={12}><h3>Points</h3></Col>
        <PointInputsComponent type='startpoint' {...props}/>
        <PointInputsComponent type='endpoint' {...props}/>
        <PointInputsComponent type='waypoint' {...props}/>

    </div>
  )
}

export default PointInputs;
