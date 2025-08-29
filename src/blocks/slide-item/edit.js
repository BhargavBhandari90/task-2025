/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { MediaUpload, RichText, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { media } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { mediaId, mediaUrl, title, description } = attributes;
	const blockProps = useBlockProps( { className: 'slide-item' } );

	return (
		<>
			<div { ...blockProps }>
				<div
					className={ `slide-image-container ${
						mediaId ? 'has-image' : ''
					}` }
				>
					{ mediaUrl && (
						<img className="slide-icon" src={ mediaUrl } alt="" />
					) }
					<MediaUpload
						onSelect={ ( media ) =>
							setAttributes( {
								mediaId: media.id,
								mediaUrl: media.url,
							} )
						}
						type="image"
						render={ ( { open } ) => (
							<Button
								className="slide-upload-button"
								onClick={ open }
								variant="tertiary"
								icon={ media }
							></Button>
						) }
					/>
				</div>
				<RichText
					tagName="h3"
					value={ title }
					onChange={ ( v ) => setAttributes( { title: v } ) }
					placeholder={ __( 'Slide title…', 'task-2025' ) }
				/>
				<RichText
					tagName="div"
					className="slide-desc"
					multiline="p"
					value={ description }
					onChange={ ( v ) => setAttributes( { description: v } ) }
					placeholder={ __( 'Description…', 'task-2025' ) }
				/>
			</div>
		</>
	);
}
