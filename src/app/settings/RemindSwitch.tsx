'use client'

import { useState } from 'react'
import { Switch } from '#components/_common/Switch'

export default function RemindSwitch({
  initialChecked,
}: {
  initialChecked: boolean
}) {
  const [checked, setChecked] = useState(initialChecked)

  const handleToggle = async () => {
    const newChecked = !checked
    setChecked(newChecked)
  }

  return <Switch checked={checked} onCheckedChange={handleToggle} />
}
