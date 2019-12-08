import React from 'react'

export default function TemplateDetails({ template }) {
  return (
    <div>
      <ul className='m-2 sm:col-count-2 md:col-count-3'>
        {template.classes.map(clas => (<li key={clas.id} className='bi-avoid p-3 border border-solid border-gray-300'>
          <h3 className='font-bold text-lg'>{clas.name}</h3>
          <ul>{clas.requirements.map(req =>
            <li key={req.id} className='ml-5'>
              {req.text}
            </li>)}</ul>
        </li>))}
      </ul>
    </div>
  )
}
