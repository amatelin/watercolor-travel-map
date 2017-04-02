'use strict'

import React from 'react'
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib'
import WaypointInputs from './WaypointInputs'
const ENTER_KEY_CODE = 13;

function RouteDraftInput(props) {
  var inputs = {"departureAddress": null,
                "arrivalAddress": null};
  const onChange = (event) => props.onUpdateRouteDraft({departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const onAddRoute = () => props.onAddRoute(props.routeType, {departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const onCloseRouteDraft = () => props.onCloseRouteDraft();
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onAddRoute();
  }
  };

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Departure address</ControlLabel>
            <FormControl inputRef={(ref) => {inputs.departureAddress = ref}}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={props.draft.departureAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Arrival address</ControlLabel>
            <FormControl inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={props.draft.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button onClick={onAddRoute}>Save</Button>
        </Col>
        <Col md={2}>
          <Button onClick={onCloseRouteDraft}>Cancel</Button>
        </Col>
      </Col>
    </div>
  )
}

function RouteInput(props) {
  const {route, routeEdited, waypoints} = props;
  var inputs = {"departureAddress": null,
                "arrivalAddress": null};

  const onSaveRoute = () => props.onSaveRoute(route.id);
  const onChange = (event) => props.onEditRoute(route.id, {departureAddress: inputs.departureAddress.value,
    arrivalAddress: inputs.arrivalAddress.value});
  const onStartEditRoute = () => props.onStartEditRoute(route.id);
  const onDeleteRoute = () => props.onDeleteRoute(route.id);
  const onOpenWaypointDraft = () => props.onOpenWaypointDraft(route.id);
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onSaveRoute();
  }
  };

  const isEdited = (route.id === routeEdited.id);
  var validationErrors = [null,null];
  if (isEdited && routeEdited.validationErrors) validationErrors = routeEdited.validationErrors;
  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[0]}>
            {(props.routeIndex === 1) &&
            <ControlLabel>Departure address</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditRoute}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.departureAddress = ref}}
              onChange={onChange} value={props.route.departureAddress}
              onKeyDown={onKeyDown}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[1]}>
            {(props.routeIndex === 1)  &&
              <ControlLabel>Arrival address</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditRoute}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange} value={props.route.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        {(isEdited &&
          <Col md={2}>
            <Button onClick={onSaveRoute}>Save</Button>
          </Col>
        )}
        <Col md={2}>
          <Button onClick={onDeleteRoute}>Delete</Button>
        </Col>
        {
          (waypoints.size < 8) &&
          <Col md={4}>
            <Button onClick={onOpenWaypointDraft}>Add waypoint</Button>
          </Col>
        }
      </Col>
      <Col md={12}>
        <WaypointInputs {...props}/>
      </Col>
    </div>

  )
}

function RouteInputsComponent(props) {
  var _local_counter = 1;
  var routes = props.routes.filter(route => route.type == props.type);
  const onOpenRouteDraft = () => props.onOpenRouteDraft(props.type);
  const draftOn = ((props.routeDraft && props.routeDraft.routeType === props.type) ? true : false);
  var input = <RouteDraftInput
              draft={props.routeDraft}
              onCloseRouteDraft={props.onCloseRouteDraft}
              onUpdateRouteDraft={props.onUpdateRouteDraft}
              onAddRoute={props.onAddRoute}
              routeType={props.type}
            />

  return (
    <Col md={12}>
      <Button disabled={draftOn} onClick={onOpenRouteDraft}>Add {props.type} route</Button>
      {draftOn ? input : null }

      {routes.map(route => (
            <RouteInput
            key={route.id}
            routeIndex={_local_counter++}
            route={route}
            {...props}

          />
        ))}

    </Col>
  )
}

function RouteInputs(props) {
  return (
    <div>
      <Col md={12}><h3>Routes</h3></Col>
        <RouteInputsComponent type='cycling' {...props}/>
        <RouteInputsComponent type='bus' {...props}/>
        <RouteInputsComponent type='train' {...props}/>
        <RouteInputsComponent type='other' {...props}/>
    </div>
  )
}

export default RouteInputs;
