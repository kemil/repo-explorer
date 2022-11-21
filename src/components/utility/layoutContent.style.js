import styled from 'styled-components'
import { palette } from 'styled-theme'

const LayoutContentStyle = styled.div`
  display: ${props => props.display};
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border: 0px solid ${palette('border', 0)};
  height: 100%;
  border-radius: 6px;
`

export default LayoutContentStyle
