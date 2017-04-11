'use strict'

import React from 'react';
import {Row, Col, FormControl, ControlLabel, FormGroup, OverlayTrigger, Glyphicon, Popover} from 'react-bootstrap/lib';
import {AddButton, DeleteButton, EditButton, SaveButton, CancelButton} from './components'
const ENTER_KEY_CODE = 13;
const POINTS_TITLES = {
  startpoint: 'starting point',
  endpoint: 'arrival point',
  waypoint: 'waypoint'
}
function PointDraftInput(props) {
  var inputs = {address: null,
                title: ''};

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
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="addressInput"
          validationState={props.draft.validationError}>
            <ControlLabel>Address</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.address = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              placeholder='required'
              value={props.draft.address}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="titleInput"
          validationState={null}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.title = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              placeholder='optional'
              value={props.draft.title}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={12} sm={6} xs={6}>
          <Col lg={6} md={12} sm={6} xs={12}>
            <SaveButton class='btn-block-md' onClick={onAddPoint} />
          </Col>
          <Col lg={6} md={12} sm={6} xs={12}>
            <CancelButton class='btn-block-md' onClick={onClosePointDraft} />
          </Col>
        </Col>
      </Col>
    </div>
  )
}

function PointInput(props) {
  const {point, pointEdited} = props;
  var inputs = {"address": null,
                "title": ''};

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
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="addressInput"
          validationState={validationError}>
            {(props.pointIndex === 1)  &&
              <ControlLabel>Address</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditPoint}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              placeholder='required'
              inputRef={(ref) => {inputs.address = ref}}
              onChange={onChange} value={props.point.address}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={4} md={6} sm={6} xs={6}>
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
              placeholder='optional'
              onChange={onChange}
              value={props.point.title}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={12} sm={6} xs={6}>
            {(isEdited) &&
              <Col lg={6} md={12} sm={6} xs={12}>
                <SaveButton class='btn-block-md' onClick={onSavePoint} />
              </Col>
            }
            {(!isEdited) &&
              <Col lg={6} md={12} sm={6} xs={12}>
                <EditButton class='btn-block-md' onClick={onStartEditPoint} />
              </Col>
            }
            <Col lg={6} md={12} sm={6} xs={12}>
              <DeleteButton class='btn-block-md' onClick={onDeletePoint} />
            </Col>
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
    <Col lg={12} md={12} sm={12} xs={12}>
      <Col lg={6} md={8} sm={12} xs={12}>
        <AddButton class='btn-block' disabled={(alreadyFilled || draftOn)} onClick={onOpenPointDraft} text={POINTS_TITLES[props.type]} />
      </Col>
      {draftOn ? input : null }

      {points.reverse().map(point => (
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
  var popover = (
    <Popover
    id="points-help-popover"
    placement="right"
    positionLeft={200}
    positionTop={50}
    title="Help: adding points"
  >
    <p>The start and arrival points will represented respectively as a green and red cross on the map.</p>
    <p>The waypoints will be represented as a yellow dots.</p>
    <p>A title can be set for any point in which case it will appear above the point.</p>
    <p>Only one start and arrival points are allowed. Any number of waypoint can be added.</p>
  </Popover>
  )

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
          <h3 className='pull-left'>Points {'\u00a0'}</h3>
          <OverlayTrigger placement="right" overlay={popover}>
            <Glyphicon glyph='question-sign'/>
          </OverlayTrigger>
      </Col>
        <PointInputsComponent type='startpoint' {...props}/>
        <PointInputsComponent type='endpoint' {...props}/>
        <PointInputsComponent type='waypoint' {...props}/>

    </div>
  )
}

export default PointInputs;
