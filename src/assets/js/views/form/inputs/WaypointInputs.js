'use strict'

import React from 'react'
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib'
import Counter from '../../../utils/Counter'

function NewWaypointInput(props) {
  console.log(props)
  var {route} = props;
  var draft = props.draft;
  var addressInput = {};
  const onChange = (event) => props.onUpdateWaypointDraft(addressInput.value);
  const onAddWaypoint = () => props.onAddWaypoint(route.id, addressInput.value);
  const onCloseWaypointDraft = () => props.onCloseWaypointDraft();

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="waypointInput">
            <ControlLabel>Waypoint address</ControlLabel>
            <FormControl  inputRef={(ref) => {addressInput = ref}} onChange={onChange}  value={draft.address} type='text'></FormControl>
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
  console.log(props)
  var {route} = props;
  var draft = props.draft;
  var addressInput = {};
  const onChange = (event) => props.onUpdateWaypointDraft(addressInput.value);
  const onAddWaypoint = () => props.onAddWaypoint(route.id, addressInput.value);
  const onCloseWaypointDraft = () => props.onCloseWaypointDraft();

  return (
    <div>
      <Col md={12}>
        <p>Waypoint nbr. {props.waypointIndex}</p>
      </Col>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="waypointInput">
            <ControlLabel>Waypoint address</ControlLabel>
            <FormControl  inputRef={(ref) => {addressInput = ref}} onChange={onChange}  value={draft.address} type='text'></FormControl>
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

function WaypointInputs(props) {
  var _local_counter = 1;
  var {waypoints, waypointDraft, route} = props;
  var routeWaypoints = waypoints.filter(waypoint => waypoint.routeId == route.id);
  // const onAddCyclingRoute = () => props.onAddRoute('cycling');
  const draftOn = (waypointDraft ? true : false);
  if (!routeWaypoints.size && waypointDraft.routeId !== route.id) return (<div></div>);

  var input = '';
  if (draftOn && waypointDraft.routeId == route.id) input = <NewWaypointInput
                                                              route={route}
                                                              draft={props.waypointDraft}
                                                              onAddWaypoint={props.onAddWaypoint}
                                                              onCloseWaypointDraft={props.onCloseWaypointDraft}
                                                              onUpdateWaypointDraft={props.onUpdateWaypointDraft}
                                                              />

  return (
    <div>
      <Col md={12}>Waypoints</Col>
      <Col md={12}>
      {input}
      {routeWaypoints.map(waypoint => (
            <WaypointInput
            key={waypoint.id}
            waypointIndex={_local_counter++}
            route={route}
            waypoint={waypoint}
            draft={props.waypointDraft}
            onAddWaypoint={props.onAddWaypoint}
            onCloseWaypointDraft={props.onCloseWaypointDraft}
            onUpdateWaypointDraft={props.onUpdateWaypointDraft}
            waypointEdited={props.waypointEdited}
            onStartEditWaypoint={props.onStartEditWaypoint}
            onEditWaypoint={props.onEditWaypoint}
            onDeleteWaypoint={props.onDeleteWaypoint}
            onSaveWaypoint={props.onSaveWaypoint}
          />
        ))}

      </Col>
    </div>
  )
}

export default WaypointInputs;
