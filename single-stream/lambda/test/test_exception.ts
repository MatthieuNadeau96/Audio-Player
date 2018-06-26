'use strict';

import 'mocha';
import { expect } from 'chai';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { handler as skill } from '../src/index';

import * as r from './request/system_exception.json'; // tslint:disable-line
const request: RequestEnvelope = <RequestEnvelope>r;

import { Assertion } from './utils/Assertion';
const A = new Assertion();

const USER_ID = "amzn1.ask.account.123";
let skill_response: ResponseEnvelope;

describe('Audio Player Test : Exception', function () {

  // pre-requisites
  before(() => {

    this.timeout(5000);

    return new Promise((resolve, reject) => {
      skill(request, null, (error, responseEnvelope) => {
        skill_response = responseEnvelope;
        resolve();
      });
    });
  });

  it('it responses with valid response structure ', () => {

    A.checkResponseStructure(skill_response);

  }),

  it('it responses with no output speech ', () => {

    // const welcomeMessage = i18n.S(request.request, 'WELCOME_MSG', audioData(request.request).card.title);
    expect(skill_response).to.have.property("response");
    let r = skill_response.response;

    expect(r).to.not.have.property("outputSpeech");

  }),

  it('it responses with no directive ', () => {

    let r = skill_response.response;
    expect(r).to.not.have.property("shouldEndSession");
    expect(r).to.not.have.property("directives");

  });
});