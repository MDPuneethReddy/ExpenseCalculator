import React, { useEffect, useState } from "react"
import {ResponsivePie} from "@nivo/pie"
import { InitialState } from "../../store/reducer";
import {useSelector} from "react-redux"
interface Iprops{
    getDebitCategoryData:any
}
export const ResponsivePieDebitChart:React.FC<Iprops>=(props:Iprops)=>{
    const { eachDebitCategory } = useSelector<InitialState, InitialState>(
        (state: InitialState) => state
      );
    useEffect(() => {
       props.getDebitCategoryData()
    }, [])
    return(
        <>
        <ResponsivePie
        data={eachDebitCategory}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
        </>
    )
}