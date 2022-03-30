import { View, Text } from 'react-native'
import React from 'react'
import { Badge } from "native-base";

export default function OvalosTextComponent(props) {
  const {text, colorScheme } = props;
  return (
    <Badge  colorScheme={colorScheme}>{text}</Badge>
  )
}