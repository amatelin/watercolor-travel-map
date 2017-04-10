'use strict'

import React from 'react';
import {Row, Col, FormControl, ControlLabel, FormGroup, OverlayTrigger, Glyphicon, Popover} from 'react-bootstrap/lib';
import {AddButton, DeleteButton, EditButton, SaveButton, CancelButton} from './components'
const ENTER_KEY_CODE = 13;

function GeodesicDraftInput(props) {
  var inputs = {"departureAddress": null,
                "arrivalAddress": null};

  const onChange = (event) => props.onUpdateGeodesicDraft({departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const onAddGeodesic = () => props.onAddGeodesic(props.geodesicType, {departureAddress: inputs.departureAddress.value,
                                                            arrivalAddress: inputs.arrivalAddress.value});
  const onCloseGeodesicDraft = () => props.onCloseGeodesicDraft();
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onAddGeodesic();
  }
  };

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="departureInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Departure location</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.departureAddress = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.departureAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={4} md={6} sm={6} xs={6}>
          <FormGroup controlId="arrivalInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Arrival location</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={12} sm={6} xs={6}>
          <Col lg={6} md={12} sm={6} xs={12}>
            <SaveButton class='btn-block-md' onClick={onAddGeodesic} />
          </Col>
          <Col lg={6} md={12} sm={6} xs={12}>
            <CancelButton class='btn-block-md' onClick={onCloseGeodesicDraft} />
          </Col>
        </Col>
      </Col>
    </div>
  )
}

function GeodesicInput(props) {
  const {geodesic, geodesicEdited} = props;
  var inputs = {"departureAddress": null,
                "arrivalAddress": null};

  const onSaveGeodesic = () => props.onSaveGeodesic(geodesic.id);
  const onChange = (event) => props.onEditGeodesic(geodesic.id, {departureAddress: inputs.departureAddress.value,
    arrivalAddress: inputs.arrivalAddress.value});
  const onStartEditGeodesic = () => props.onStartEditGeodesic(geodesic.id);
  const onDeleteGeodesic = () => props.onDeleteGeodesic(geodesic.id);
  const onKeyDown = (event) => {
  if (event.keyCode === ENTER_KEY_CODE) {
    onSaveGeodesic();
  }
  };

  const isEdited = (geodesic.id === geodesicEdited.id);
  var validationErrors = [null,null];
  if (isEdited && geodesicEdited.validationErrors) validationErrors = geodesicEdited.validationErrors;
  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
        <Col md={4} sm={6} xs={6}>
          <FormGroup controlId="departureAddressInput"
          validationState={validationErrors[0]}>
            {(props.geodesicIndex === 1) &&
            <ControlLabel>Latitude</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditGeodesic}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.departureAddress = ref}}
              onChange={onChange} value={props.geodesic.departureAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4} sm={6} xs={6}>
          <FormGroup controlId="arrivalAddressInput"
          validationState={validationErrors[1]}>
            {(props.geodesicIndex === 1)  &&
              <ControlLabel>Longitude</ControlLabel>
            }
            <FormControl
              onDoubleClick={onStartEditGeodesic}
              onKeyDown={onKeyDown}
              readOnly={!isEdited}
              inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onChange={onChange} value={props.geodesic.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col lg={5} md={8} sm={12} xs={12}>
          {(isEdited) &&
            <Col lg={6} md={12} sm={6} xs={12}>
              <SaveButton class='btn-block-md' onClick={onSaveGeodesic} />
            </Col>
          }
          {(!isEdited) &&
            <Col lg={6} md={12} sm={6} xs={12}>
              <EditButton class='btn-block-md' onClick={onStartEditGeodesic} />
            </Col>
          }
          <Col lg={6} md={12} sm={6} xs={12}>
            <DeleteButton class='btn-block-md' onClick={onDeleteGeodesic} />
          </Col>
        </Col>
      </Col>
    </div>

  )
}

function GeodesicInputsComponent(props) {
  var _local_counter = 1;
  var geodesics = props.geodesics.filter(geodesic => geodesic.type == props.type);
  const onOpenGeodesicDraft = () => props.onOpenGeodesicDraft(props.type);
  const draftOn = ((props.geodesicDraft && props.geodesicDraft.geodesicType === props.type) ? true : false);
  var input = <GeodesicDraftInput
              draft={props.geodesicDraft}
              onCloseGeodesicDraft={props.onCloseGeodesicDraft}
              onUpdateGeodesicDraft={props.onUpdateGeodesicDraft}
              onAddGeodesic={props.onAddGeodesic}
              geodesicType={props.type}
            />

  return (
    <Col lg={12} md={12} sm={12} xs={12}>
      <Col lg={6} md={8} sm={12} xs={12}>
        <AddButton class='btn-block' disabled={draftOn} onClick={onOpenGeodesicDraft} text={props.type}/>
      </Col>
      {draftOn ? input : null }

      {geodesics.map(geodesic => (
            <GeodesicInput
            key={geodesic.id}
            geodesicIndex={_local_counter++}
            geodesic={geodesic}
            {...props}

          />
        ))}

    </Col>
  )
}

function GeodesicInputs(props) {
  var popover = (
    <Popover
    id="geodesics-help-popover"
    placement="right"
    positionLeft={200}
    positionTop={50}
    title="Help: adding geodesics"
  >
    <p>A geodesic is the shortest possible line between two points on a curved surface.</p>
    <p>They are used to represent non-routed travels (ie: flights and ferry rides).</p>
    <p>They work similarely to routes, taking a departure and arrival address as inputs.</p>
    <p>Any number of them can be added.</p>
  </Popover>
  )

  return (
    <div>
      <Col md={12} className='vertical-align-middle'>
          <h3 className='pull-left'>Geodesics {'\u00a0'}</h3>
          <OverlayTrigger placement="right" overlay={popover}>
            <Glyphicon glyph='question-sign'/>
          </OverlayTrigger>
      </Col>
        <GeodesicInputsComponent type='flight' {...props}/>
        <GeodesicInputsComponent type='ferry' {...props}/>
    </div>
  )
}

export default GeodesicInputs;
