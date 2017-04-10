'use strict'

import React from 'react';
import {Row, Col, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
import {DeleteButton, EditButton, SaveButton, CancelButton} from './components'
const ENTER_KEY_CODE = 13;

function WaypointDraftInput(props) {
  var {route, draft} = props;
  var addressInput = {};
  const onChange = (event) => props.onUpdateWaypointDraft(addressInput.value);
  const onAddWaypoint = () => props.onAddWaypoint(route.id, addressInput.value);
  const onCloseWaypointDraft = () => props.onCloseWaypointDraft();
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onAddWaypoint();
  }
  };

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="waypointInput"
            validationState={props.draft.validationError}>
            <ControlLabel>Location</ControlLabel>
            <FormControl
              inputRef={(ref) => {addressInput = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={draft.address}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={12} sm={6} xs={6}>
          <Col lg={6} md={12} sm={6} xs={12}>
            <SaveButton class='btn-block-md' onClick={onAddWaypoint} />
          </Col>
          <Col lg={6} md={12} sm={6} xs={12}>
            <CancelButton class='btn-block-md' onClick={onCloseWaypointDraft} />
          </Col>
        </Col>
      </Col>
    </div>
  )
}

function WaypointInput(props) {
  var {route, waypoint, waypointEdited} = props;
  var addressInput = {};

  const onSaveWaypoint = () => props.onSaveWaypoint(waypoint.id)
  const onChange = (event) => props.onEditWaypoint(waypoint.id, addressInput.value);
  const onStartEditWaypoint = () => props.onStartEditWaypoint(waypoint.id);
  const onDeleteWaypoint = () => props.onDeleteWaypoint(waypoint.id);
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onSaveWaypoint();
  }
  };

  const isEdited = (waypoint.id === waypointEdited.id);
  var validationError = null
  if (isEdited && waypointEdited) validationError = waypointEdited.validationError
  return (
    <div>
      <Col md={12}>
        <p>Waypoint {props.waypointIndex}</p>
      </Col>
      <Col md={12} className='vertical-align-middle'>
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="waypointInput"
            validationState={validationError}>
            {(props.waypointIndex === 1) &&
              <ControlLabel>Location</ControlLabel>
            }
            <FormControl
              inputRef={(ref) => {addressInput = ref}}
              readOnly={!isEdited}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={waypoint.address}
              type='text'
              onDoubleClick={onStartEditWaypoint}
              ></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={12} sm={6} xs={6}>
          {(isEdited) &&
            <Col lg={6} md={12} sm={6} xs={12}>
              <SaveButton class='btn-block-md' onClick={onSaveWaypoint} />
            </Col>
          }
          {(!isEdited) &&
            <Col lg={6} md={12} sm={6} xs={12}>
              <EditButton class='btn-block-md' onClick={onStartEditWaypoint} />
            </Col>
          }
          <Col lg={6} md={12} sm={6} xs={12}>
            <DeleteButton class='btn-block-md' onClick={onDeleteWaypoint} />
          </Col>
        </Col>
      </Col>
    </div>
  )
}

function WaypointInputs(props) {
  var _local_counter = 1;
  var {waypoints, waypointDraft, route} = props;
  var routeWaypoints = waypoints.filter(waypoint => waypoint.routeId == route.id);
  const draftOn = (waypointDraft ? true : false);
  if (!routeWaypoints.size && waypointDraft.routeId !== route.id) return (<div></div>);

  var input = '';
  if (draftOn && waypointDraft.routeId == route.id) input = <WaypointDraftInput
                                                              route={route}
                                                              draft={props.waypointDraft}
                                                              onAddWaypoint={props.onAddWaypoint}
                                                              onCloseWaypointDraft={props.onCloseWaypointDraft}
                                                              onUpdateWaypointDraft={props.onUpdateWaypointDraft}
                                                              />

  return (
    <div>
      <Col md={12}><h3>Waypoints</h3></Col>
      <Col md={12}>
      {input}
      {routeWaypoints.map(waypoint => (
            <WaypointInput
            key={waypoint.id}
            waypointIndex={_local_counter++}
            waypoint={waypoint}
            {...props}
          />
        ))}

      </Col>
    </div>
  )
}

export default WaypointInputs;
