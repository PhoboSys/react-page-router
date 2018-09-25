import React from 'react'

import map from 'lodash.map'
import reverse from 'lodash.reverse'
import last from 'lodash.last'
import defaults from 'lodash.defaults'
import size from 'lodash.size'
import find from 'lodash.find'
import get from 'lodash.get'

import qs from 'qs'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

var _cssTransitionDefaults = {
  classNames: 'route',
  timeout: 1000
}

function createRouteTransitionMiddleware (routingBranch) {
  var routemap = last(routingBranch)
  return function (context, next) {
    context.name = routemap.name
    context.route = routemap
    context.names = []
    context.refs = {}
    next()
  }
}

export function transitionRoutingMiddlewares (routingBranch) {
  return [
    createRouteTransitionMiddleware(routingBranch)
  ].concat(
    map(reverse(routingBranch), createRouteComponentTransitionMiddleware)
  )
}

function refMethod(context, refName, method) {
  return function () {
    var ref = get(context, ['refs', refName])

    // getWrappedInstance needed for redux connect case
    if (ref && typeof ref.getWrappedInstance === "function") {
      ref = ref.getWrappedInstance()
    }

    if (ref && typeof ref[method] === "function") {
      ref[method]()
    }
  }
}

function createRouteComponentTransitionMiddleware (routemap) {
  return function (context, next) {
    var element = context.component
    if (size(routemap.children) > 0 && routemap.transition) {
      var parentTransition = get(routemap, "transition")

      var childRoutename = context.names[0]
      var childRoutemap = find(routemap.children, ['name', childRoutename])
      var childTransition = get(childRoutemap, "transition")

      var transition = defaults(
        { key: childRoutename },
        childTransition,
        parentTransition,
        {
          onEnter: refMethod(context, childRoutename, "componentWillEnter"),
          onEntering: refMethod(context, childRoutename, "componentEntering"),
          onEntered: refMethod(context, childRoutename, "componentDidEnter"),
          onExit: refMethod(context, childRoutename, "componentWillExit"),
          onExiting: refMethod(context, childRoutename, "componentExiting"),
          onExited: refMethod(context, childRoutename, "componentDidExit")
        },
        _cssTransitionDefaults
      )
      element = React.createElement(
        TransitionGroup,
        { key: routemap.name },
        React.createElement(
          CSSTransition,
          transition,
          context.component
        )
      )
    }

    context.names.unshift(routemap.name)
    context.component = React.createElement(
      routemap.component,
      {
        ref: function (ref) { if (ref) context.refs[routemap.name] = ref },
      }, element
    )

    next()
  }
}

export function createUrlParsingMiddleware () {
  return function (context, next) {
    var parsed = context.path.split('?')
    context.qpathname = context.pathname
    context.pathname = parsed[0]
    context.querystring = parsed[1] || ''
    context.query = qs.parse(context.querystring)

    var parsedloc = location.search.split('?')
    var querystringloc = parsedloc[1] || ''
    context.locationquery = qs.parse(querystringloc)

    next()
  }
}

export function transitionRenderingMiddleware (renderer) {
  return function (context, next) {
    renderer.render(context.component)
  }
}
