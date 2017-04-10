'use strict'

import React from 'react';
import {Row, Col, FormControl, ControlLabel, FormGroup} from 'react-bootstrap/lib';
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
        <Col md={4}>
          <FormGroup controlId="departureInput"
          validationState={props.draft.validationErrors[0]}>
            <ControlLabel>Departure</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.departureAddress = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.departureAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup controlId="arrivalInput"
          validationState={props.draft.validationErrors[1]}>
            <ControlLabel>Arrival</ControlLabel>
            <FormControl
              inputRef={(ref) => {inputs.arrivalAddress = ref}}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={props.draft.arrivalAddress}
              type='text'></FormControl>
          </FormGroup>
        </Col>
        <Col md={2}>
          <SaveButton onClick={onAddGeodesic} />
        </Col>
        <Col md={2}>
          <CancelButton onClick={onCloseGeodesicDraft} />
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
        <Col md={4}>
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
        <Col md={4}>
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
        {(isEdited) &&
          <Col md={2}>
            <SaveButton onClick={onSaveGeodesic} />
          </Col>
        }
        {(!isEdited) &&
          <Col md={2}>
            <EditButton onClick={onStartEditGeodesic} />
          </Col>
        }
        <Col md={2}>
            <DeleteButton onClick={onDeleteGeodesic} />
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
    <Col md={12}>
      <Col md={4}>
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
  return (
    <div>
      <Col md={12}><h3>Geodesics</h3></Col>
        <GeodesicInputsComponent type='flight' {...props}/>
        <GeodesicInputsComponent type='ferry' {...props}/>
    </div>
  )
}

export default GeodesicInputs;
