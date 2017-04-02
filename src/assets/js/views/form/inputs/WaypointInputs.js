'use strict'

import React from 'react';
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
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
        <Col md={4}>
          <FormGroup controlId="waypointInput"
            validationState={props.draft.validationError}>
            <ControlLabel>Waypoint address</ControlLabel>
            <FormControl
              inputRef={(ref) => {addressInput = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={draft.address}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button onClick={onAddWaypoint}>Save</Button>
        </Col>
        <Col md={2}>
          <Button onClick={onCloseWaypointDraft}>Cancel</Button>
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
        <p>Waypoint nbr. {props.waypointIndex}</p>
      </Col>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="waypointInput"
            validationState={validationError}>
            {(props.waypointIndex === 1) &&
              <ControlLabel>Waypoint address</ControlLabel>
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
          { (isEdited) &&
            <Col md={2}>
              <Button onClick={onSaveWaypoint}>Save</Button>
            </Col>}
        <Col md={2}>
          <Button onClick={onDeleteWaypoint}>Delete</Button>
        </Col>
      </Col>
    </div>
  )
}

function WaypointInputs(props) {
  var _local_counter = 1;
  console.log(props)
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
