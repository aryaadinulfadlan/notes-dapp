#![allow(clippy::result_large_err)]
#![allow(unexpected_cfgs)]
use anchor_lang::prelude::*;

declare_id!("DWwD3X6V5QwGEpktGQSrhKU2JVKiwp8vX6ztZj3BGkxT");

#[program]
pub mod notesdapp {
    use super::*;
    pub fn create_note(ctx: Context<CreateNote>, title: String, content: String) -> Result<()> {
        let note = &mut ctx.accounts.note;
        let clock = Clock::get()?;
        require!(title.len() <= 20, NotesError::TitleTooLong);
        require!(content.len() <= 100, NotesError::ContentTooLong);
        require!(!title.trim().is_empty(), NotesError::TitleEmpty);
        require!(!content.trim().is_empty(), NotesError::ContentEmpty);
        note.author = ctx.accounts.author.key();
        note.title = title.clone();
        note.content = content.clone();
        note.created_at = clock.unix_timestamp;
        note.updated_at = clock.unix_timestamp;
        msg!(
            "Note created! Title: {}, Author: {}, Created At: {}",
            note.title,
            note.author,
            note.created_at
        );
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Note {
    pub author: Pubkey,
    #[max_len(20)]
    pub title: String,
    #[max_len(100)]
    pub content: String,
    pub created_at: i64,
    pub updated_at: i64,
}

#[error_code]
pub enum NotesError {
    #[msg("Title cannot be longer than 20 chars")]
    TitleTooLong,
    #[msg("Content cannot be longer than 100 chars")]
    ContentTooLong,
    #[msg("Title cannot be empty")]
    TitleEmpty,
    #[msg("Content cannot be empty")]
    ContentEmpty,
    #[msg("Unauthorized")]
    Unauthorized,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateNote<'info> {
    #[account(mut)]
    pub author: Signer<'info>,
    #[account(
        init,
        payer = author,
        space = 8 + Note::INIT_SPACE,
        // seeds = [b"note", author.key().as_ref(), &hash(title.as_bytes()).to_bytes()],
        seeds = [b"note", author.key().as_ref(), title.as_bytes()],
        bump,
    )]
    pub note: Account<'info, Note>,
    pub system_program: Program<'info, System>,
}