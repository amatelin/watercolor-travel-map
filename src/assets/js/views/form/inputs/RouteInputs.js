'use strict'

import React from 'react'
import {Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib'
import Counter from '../../../utils/Counter'

function NewRouteInput(props) {
  var inputs = {"departureAddress": null,
                "arrivalAddress": null};
  const onChange = (event) => props.onUpdateRouteDraft({departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const onAddRoute = () => props.onAddRoute(props.routeType, {departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const onCloseRouteDraft = () => props.onCloseRouteDraft();

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Departure address</ControlLabel>
            <FormControl inputRef={(ref) => {inputs.departureAddress = ref}} onChange={onChange} value={props.draft.departureAddress} type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Arrival address</ControlLabel>
            <FormControl inputRef={(ref) => {inputs.arrivalAddress = ref}} onChange={onChange} value={props.draft.arrivalAddress} type='text'></FormControl>
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
  const {route, routeEdited} = props;
  var inputs = {"departureAddress": null,
                "arrivalAddress": null};
  const onDeleteRoute = () => props.onDeleteRoute(route.id);
  const onSaveRoute = () => props.onSaveRoute(route.id);
  const onStartEditRoute = () => props.onStartEditRoute(route.id);
  const onChange = (event) => props.onEditRoute(route.id, {departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const isEdited = (route.id === routeEdited.id);
  var validationErrors = [null,null];
  if (isEdited && routeEdited.validationErrors) validationErrors = routeEdited.validationErrors;

  return (
    <div onDoubleClick={onStartEditRoute}>
      <Col md={12}>
        <p>Route nbr. {props.routeIndex}</p>
      </Col>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[0]}>
            <ControlLabel>Departure address</ControlLabel>
            <FormControl
              disabled={!isEdited}
              inputRef={(ref) => {inputs.departureAddress = ref}}
              onChange={onChange} value={props.route.departureAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[1]}>
            <ControlLabel>Arrival address</ControlLabel>
            <FormControl
              disabled={!isEdited}
              inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onChange={onChange} value={props.route.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <Button disabled={!isEdited} onClick={onSaveRoute}>Save</Button>
        </Col>
        <Col md={2}>
          <Button onClick={onDeleteRoute}>Delete</Button>
        </Col>
      </Col>
    </div>

  )
}

function RouteInputs(props) {
  var _local_counter = 1;
  var cyclingRoutes = props.routes.filter(route => route.type == 'cycling');
  const onAddCyclingRoute = () => props.onAddRoute('cycling');
  const draftOn = (props.routeDraft ? true : false);

var input = <NewRouteInput
            draft={props.routeDraft}
            onCloseRouteDraft={props.onCloseRouteDraft}
            onUpdateRouteDraft={props.onUpdateRouteDraft}
            onAddRoute={props.onAddRoute}
            routeType='cycling'
          />

  return (
    <div>
      <Col md={12}>Routes</Col>

      <Col md={12}>
        <Button disabled={draftOn} onClick={props.onOpenRouteDraft}>Add new cycling route!</Button>
        {(props.routeDraft) ? input : null }

        {cyclingRoutes.map(route => (
              <RouteInput
              key={route.id}
              routeIndex={_local_counter++}
              route={route}
              routeEdited={props.routeEdited}
              onStartEditRoute={props.onStartEditRoute}
              onEditRoute={props.onEditRoute}
              onDeleteRoute={props.onDeleteRoute}
              onSaveRoute={props.onSaveRoute}
            />
          ))}

      </Col>
    </div>
  )
}

export default RouteInputs;
