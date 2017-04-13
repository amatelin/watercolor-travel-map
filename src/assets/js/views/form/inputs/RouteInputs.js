'use strict'

import React from 'react';
import {Row, Col, FormControl, ControlLabel, FormGroup, OverlayTrigger, Glyphicon, Popover} from 'react-bootstrap/lib';
import {AddButton, DeleteButton, EditButton, SaveButton, CancelButton} from './components'
import WaypointInputs from './WaypointInputs';
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
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="departureAddressInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Departure from</ControlLabel>
            <FormControl inputRef={(ref) => {inputs.departureAddress = ref}}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder='required'
              value={props.draft.departureAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="departureAddressInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Arrival at</ControlLabel>
            <FormControl inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder='required'
              value={props.draft.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={12} sm={6} xs={6}>
          <Col lg={6} md={12} sm={6} xs={12}>
            <SaveButton class='btn-block-md' onClick={onAddRoute} />
          </Col>
          <Col lg={6} md={12} sm={6} xs={12}>
            <CancelButton class='btn-block-md' onClick={onCloseRouteDraft} />
          </Col>
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

  var routeWaypoints = waypoints.filter(waypoint => waypoint.routeId == route.id);

  const isEdited = (route.id === routeEdited.id);
  var validationErrors = [null,null];
  if (isEdited && routeEdited.validationErrors) validationErrors = routeEdited.validationErrors;
  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4} sm={6} xs={6}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[0]}>
            {(props.routeIndex === 1) &&
            <ControlLabel>Departure from</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditRoute}
              readOnly={!isEdited}
              placeholder='required'
              inputRef={(ref) => {inputs.departureAddress = ref}}
              onChange={onChange} value={props.route.departureAddress}
              onKeyDown={onKeyDown}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4} sm={6} xs={6}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[1]}>
            {(props.routeIndex === 1)  &&
              <ControlLabel>Arrival at</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditRoute}
              readOnly={!isEdited}
              placeholder='required'
              inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange} value={props.route.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={8} sm={12} xs={12}>
          {(isEdited) &&
            <Col md={12}>
              <SaveButton class='btn-block' onClick={onSaveRoute} />
            </Col>
          }
          {(!isEdited) &&
            <Col md={12}>
              <EditButton class='btn-block' onClick={onStartEditRoute} />
            </Col>
          }
          <Col md={12}>
            <DeleteButton class='btn-block' onClick={onDeleteRoute} />
          </Col>
          {(routeWaypoints.size < 8) &&
            <Col md={12}>
              <AddButton class='btn-block' onClick={onOpenWaypointDraft} text='waypoint' />
            </Col>
          }
        </Col>
      </Col>
      <Col md={12}>
        <WaypointInputs routeWaypoints={routeWaypoints} {...props}/>
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
    <Col bsStyle='danger' lg={12} md={12} sm={12} xs={12} className='view-block' id={'route-input-'+props.type}>
      <Col lg={6} md={8} sm={12} xs={12}>
        <AddButton class='btn-block' disabled={draftOn} onClick={onOpenRouteDraft} text={props.type} />
      </Col>
      {draftOn ? input : null }

      {routes.reverse().map(route => (
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
    const popover = (
    <Popover
      id="routes-help-popover"
      placement="right"
      positionLeft={200}
      positionTop={50}
      title="Help: adding routes"
    >
      <p>To add a new route to your map, enter the address of departure and arrival.</p>
      <p>The route between those two points will automatically be generated using google maps.</p>
      <p>You can add waypoints through which the route should pass (with a limit of 8 per individual route).</p>
    </Popover>
  )

  return (
    <div>
        <Col id='route-inputs-title' md={12} className='vertical-align-middle view-block'>
            <h3 className='pull-left'>Routes {'\u00a0'}</h3>
            <OverlayTrigger placement="right" overlay={popover}>
              <Glyphicon glyph='question-sign'/>
            </OverlayTrigger>
        </Col>
          <RouteInputsComponent type='cycling' {...props}/>
          <RouteInputsComponent type='train' {...props}/>
          <RouteInputsComponent type='bus' {...props}/>
          <RouteInputsComponent type='other' {...props}/>
    </div>
  )
}

export default RouteInputs;
