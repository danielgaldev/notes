import React from 'react'

export default function TemplateDetails({ template }) {
  return (
    <div>
      <ul>
        {template.classes.map(clas => (<li key={clas.id}>
          <div>{clas.name}</div>
          <ul>{clas.requirements.map(req => <li key={req.id}>
            {req.text}
          </li>)}</ul>
        </li>))}
      </ul>
    </div>
  )
}
