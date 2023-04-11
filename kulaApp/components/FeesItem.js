import React from 'react'
import { View, Text } from 'react-native'

export default function FeesItem({ item }) {
    const { title } = item;
    return (
        <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding:20,
            // borderBottomWidth:1,
            borderBottomColor:'999',
        
        }}>
            <Text style={{ fontWeight:'400', fontSize: 14 }}>{title}</Text>
            <Text style={{ opacity:0.7, fontSize: 16}}>50{'ksh'}</Text>
        </View>
    )
}
